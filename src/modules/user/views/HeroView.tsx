"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";

import Hero from "../components/hero/Hero";

export default function LoginView(){
    return(
        <ApolloProvider client={client}>
        <Hero/>
        </ApolloProvider>
    )
}