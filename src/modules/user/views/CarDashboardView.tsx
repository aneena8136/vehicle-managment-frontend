"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";
import CarDashboard from "../components/cardashboard/CarDashboard";


export default function CarDashboardView(){
    return(
        <ApolloProvider client={client}>
        <CarDashboard/>
        </ApolloProvider>
    )
}