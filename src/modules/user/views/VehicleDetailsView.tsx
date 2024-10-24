"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";
import { useParams } from 'next/navigation';


import VehicleDetails from "../components/vehiclepage/VehicleDetails";

export default function VehicleDetailsView({ params }: { params: { id: string } }){
    
 
    return(
        <ApolloProvider client={client}>
        <VehicleDetails params={params}/>
        </ApolloProvider>
    )
}