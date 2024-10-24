"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";
import { useParams } from 'next/navigation';



import BookVehiclePage from "../components/BookVehiclePage/BookVehiclePage";

export default function BookVehicleView(){
    const params = useParams();
    const id = params.id as string;
    return(
        <ApolloProvider client={client}>
        <BookVehiclePage id={id}/>
        </ApolloProvider>
    )
}