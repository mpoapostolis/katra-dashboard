#!/usr/bin/env Rscript

################################################################################
############################### PARSE ARGUMENTS ################################
################################################################################

suppressPackageStartupMessages(library(docopt))

'usage: TM_pubmed <searchTerms> <startDate> <endDate> <stopWords> [--help]

-h --help  show this
' -> doc

args <- docopt(doc)

search_topic  <- args$searchTerms
start_date    <- as.integer(args$startDate)
end_date      <- as.integer(args$endDate)
usr_stopwords <- trimws(unlist(strsplit(args$stopWords, ",")))

################################################################################
################################## LIBRARIES ###################################
################################################################################

suppressPackageStartupMessages(library(RISmed))
suppressPackageStartupMessages(library(qdap))
suppressPackageStartupMessages(library(tm))
suppressPackageStartupMessages(library(wordcloud))
suppressPackageStartupMessages(library(jsonlite))
suppressPackageStartupMessages(library(dendextend))

################################################################################
############################## SEARCH PARAMETERS ###############################
################################################################################

# define stop-words (concatenates common english stop words and user specified)
stopwords <- c(stopwords('english'), usr_stopwords)

max_papers   <- 999999 # max papers per year
n_words      <- 50     # number of top frequent words to display
n_clust      <- 3      # number of clusters for dendrogram plot
pdf_file     <- "resultplots.pdf" # pdf file name where the results are saved
json_freq    <- "wordfreq.json"   # json file name for word frequency results

################################################################################
################################ DOWNLOAD DATA #################################
################################################################################

search_query <- EUtilsSummary(search_topic, type="esearch", mindate=start_date, maxdate=end_date, retmax=999999)
records <- EUtilsGet(search_query)

# show number of results
# no_papers <- QueryCount(search_query)

# see the PUBMED ids of our returned query
# show(QueryId(search_query))

# get max_papers per yeach year
y <- YearPubmed(records) # year
inds <- unlist(tapply(seq(y), y, tail, max_papers))

# get year, abstract, title, URL and DOI
y <- y[inds]
a <- AbstractText(records)[inds]
t <- ArticleTitle(records)[inds]
p <- PMID(records)[inds]
u <- paste0("https://www.ncbi.nlm.nih.gov/pubmed/", p)
d <- ELocationID(records)[inds]

################################################################################
################################### ANALYSES ###################################
################################################################################

################################ WORD FREQUENCY ################################

# text-mining function for computing frequency of n words
FreqNwords <- function(yr) {
  articles1  <- data.frame('Year'=y, 'Abstract'=a, check.names=TRUE)
  abstracts1 <- articles1[which(articles1$Year==yr),]
  abstracts1 <- data.frame(abstracts1)
  abstractsOnly <- as.character(abstracts1$Abstract)
  abstractsOnly <- paste(abstractsOnly, sep="", collapse="")
  abstractsOnly <- as.vector(abstractsOnly)
  abstractsOnly <- strip(abstractsOnly)
  stsp <- rm_stopwords(abstractsOnly, stopwords = qdapDictionaries::Top100Words)
  ord  <- as.data.frame(table(stsp))
  ord  <- ord[order(ord$Freq, decreasing=TRUE),]
  head(ord, n_words)
}

# get word frequencies for each year
all <- Map(FreqNwords, start_date:end_date)
names(all) <- start_date:end_date
all <- all[lengths(all)!=0] # remove empty years
all <- lapply(all, function(x) paste0('"', x[,1], '"', '|', '"', x[,2], '"')) # format

# get paper informations for each year
papers <- paste0('"', t, '"', '|', '"', u, '"', '|', '"', d, '"')
papers <- split(papers, y)

# combine everything by year
results <- unlist(Map(c, names(all), all, papers))

filename <- paste0("results-aud.csv")
writeLines(results, filename)

################################################################################
################################ MAKE A CORPUS #################################
################################################################################

################################ WRITE TO FILE #################################

df <- data.frame(PMID=p, Title=t, abstract=a)
write.csv(df, file="corpus.csv", row.names=FALSE)

############################ CLEAN UP FOR ANALYSIS #############################

abstract_corpus <- Corpus(VectorSource(a))

# remove URLs
removeURL <- function(x) gsub("http[^[:space:]]*", "", x)
abstract_corpus <- tm_map(abstract_corpus, content_transformer(removeURL))

# remove anything other than English letters or space
removeNumPunct <- function(x) gsub("[^[:alpha:][:space:]]*", "", x)
abstract_corpus <- tm_map(abstract_corpus, content_transformer(removeNumPunct))

# convert to lower case
abstract_corpus <- tm_map(abstract_corpus, content_transformer(tolower))
abstract_corpus <- tm_map(abstract_corpus, PlainTextDocument)
abstract_corpus <- tm_map(abstract_corpus, function(x) iconv(x,'UTF-8', 'ASCII', sub=' '))

# keep a copy for stem completion later
dictionary <- abstract_corpus

# keep the stem of the words
abstract_corpus <- tm_map(abstract_corpus, stemDocument)

# remove stopwords
abstract_corpus <- tm_map(abstract_corpus, removeWords, stopwords)

# remove extra whitespace
abstract_corpus <- tm_map(abstract_corpus, stripWhitespace)
abstract_corpus <- tm_map(abstract_corpus, trimws)

# complete stem words
complete_stems <- function(x, dictionary) {
  x <- unlist(strsplit(as.character(x), " "))
  x <- x[x != ""]
  x <- stemCompletion(x, dictionary=dictionary)
  x <- paste(x, sep="", collapse=" ")
  stripWhitespace(x)
}
abstract_corpus <- lapply(abstract_corpus, complete_stems, dictionary=dictionary)
abstract_corpus <- Corpus(VectorSource(abstract_corpus))

# remove stopwords after stem completion
abstract_corpus <- tm_map(abstract_corpus, removeWords, stopwords)

# prepare
tdm <- TermDocumentMatrix(abstract_corpus, control=list(wordLengths = c(1, Inf)))
dtm <- DocumentTermMatrix(abstract_corpus, control=list(wordLengths = c(1, Inf)))

term_freq <- rowSums(as.matrix(tdm))
term_freq <- tail(sort(term_freq), n_words)
df_freq   <- data.frame(term=names(term_freq), freq=term_freq, stringsAsFactors=FALSE)

############################# MOST FREQUENT TERMS ##############################

pdf(pdf_file)
dev.control("enable")

p <- par(mar=c(5,8,2,2))
barplot(df_freq$freq, names=df_freq$term, horiz=TRUE, las=1, cex.names=0.6, border=NA,
        col="lightslategray", xlab="", axes=FALSE, xlim=c(0, max(pretty(df_freq$freq)))
        )
axis(1, cex.axis=0.6, tck=-0.01, mgp=c(2,0.5,0))
mtext("Word Frequency", side=1, line=2, cex=0.8)
title(paste(n_words, "most frequent words"))
par(p)

dev.copy(png, filename="wordfreq.png", width=600, height=600)
off <- dev.off()

################################## WORD CLOUD ##################################

pal <- brewer.pal(9, "BuGn")[-(1:4)]
wordcloud(words=df_freq$term, freq=df_freq$freq, min.freq=2, random.order=F, colors=pal, max.words=50)

dev.copy(png, filename="wordcloud.png", width=600, height=600)
off <- dev.off()

########################### HIERARCHICAL CLUSTERING ############################

# dtms <- removeSparseTerms(dtm, 0.8)
d   <- as.matrix(dist(t(dtm), method="euclidian"))
d   <- d[rownames(d) %in% df_freq$term, colnames(d) %in% df_freq$term]
fit <- as.dendrogram(hclust(as.dist(d), method="ward.D"))
fit <- color_branches(fit, k=n_clust)

nodepar <- list(lab.cex=0.7, pch=19, cex=0.5)
plot(fit, xlab="", ylab="", sub="", las=1, axes=FALSE, nodePar=nodepar)

dev.copy(png, filename="clustering.png", width=600, height=600)
off <- dev.off()

off <- dev.off()

################################################################################
################################ WRITE TO JSON #################################
################################################################################

# save word frequency table
write_json(df_freq, path="test.json", pretty=TRUE)
