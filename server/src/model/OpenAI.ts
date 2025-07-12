/**
 *  Field names and sentiment values have been chosen to reduce the number of tokens required in Open AI's response.
 * _1 corresponds to Sentiment; P is Positive, Ntl is Neutral, and Ng is Negative
 * _2 correponds to the article summary
 * */
export interface OpenAIResponse {
  _1: "P" | "Ntl" | "Ng";
  _2: string;
}
