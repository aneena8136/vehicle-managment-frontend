"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";
import BillPage from "../components/Billpage/BillPage";


export default function BillView(){
    return(
        <ApolloProvider client={client}>
        <BillPage/>
        </ApolloProvider>
    )
}