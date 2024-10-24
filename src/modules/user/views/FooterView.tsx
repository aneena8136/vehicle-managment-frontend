"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";

import Footer from "../components/footer/Footer";

export default function LoginView(){
    return(
        <ApolloProvider client={client}>
        <Footer/>
        </ApolloProvider>
    )
}