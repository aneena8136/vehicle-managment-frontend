"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";

import PlanTrip from "../components/plantrip/PlanTrip";

export default function PlanTripView(){
    return(
        <ApolloProvider client={client}>
        <PlanTrip/>
        </ApolloProvider>
    )
}