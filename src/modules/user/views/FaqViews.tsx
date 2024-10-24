"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";

import Faq from "../components/faq/Faq";

export default function FaqView(){
    return(
        <ApolloProvider client={client}>
        <Faq/>
        </ApolloProvider>
    )
}