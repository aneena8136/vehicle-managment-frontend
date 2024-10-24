"use client"
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apolloClient";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterView(){
    return(
        <ApolloProvider client={client}>
            <RegisterForm/>
        </ApolloProvider>
    )
}