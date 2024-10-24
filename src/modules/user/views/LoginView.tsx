"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";

import LoginForm from "../components/auth/Login";

export default function LoginView(){
    return(
        <ApolloProvider client={client}>
        <LoginForm/>
        </ApolloProvider>
    )
}