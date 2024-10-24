"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";
import SendOtpForm from "../components/otp/SendOtpForm";

export default function SendOtpView(){
    return(
        <ApolloProvider client={client}>
        <SendOtpForm/>
        </ApolloProvider>
    )
}