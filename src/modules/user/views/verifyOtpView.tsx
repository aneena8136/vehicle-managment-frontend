"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";

import VerifyOtpForm from "../components/otp/VerifyOtpForm";

export default function VerifyOtpView(){
    return(
        <ApolloProvider client={client}>
        <VerifyOtpForm/>
        </ApolloProvider>
    )
}