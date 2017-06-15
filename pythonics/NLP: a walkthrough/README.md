This walkthrough overviews basic steps to perform natural language processing on textual corpora.

These steps include:
1. Data acquisition. We'll go over (a) how to access whole corpora from Project Gutenberg, (b) how to piece together corpora from existing web resources through a process known as "web scraping," and (c) how to use an application-program interface, or API, to acquire data.
2. Data storage. We'll go over cases in which storing "unstructured" text data (a) doesn't require external storage, (b) can be stored in highly-compressed files known as "Pickle files," and (c) warrants the use of a "Mongo" database.
3. Data wireframing. We'll cover how to get data into an easy-to-work-with tabular format using the Python library "Pandas."
4. Preprocessing. We'll go over various ways in which you can ready your corpora for natural language processing. There are many decisions to be made in this step that will affect your results down the line! Preprocessing is a process to which you will return time and again.
5. Vectorization. As a natural follow-up to preprocessing...
6. Counting. (a) Words, (b) parts of speech
8. Clustering. K-means
7. Topic modeling. LDA

The example corpora I will be using for steps 3-7 comprise two dozen different editions of the English Bible. The goal here is to acquaint you with how to think through natural language processing by understanding how it is actually carried out step-by-step. Let's get down to brass tacks!