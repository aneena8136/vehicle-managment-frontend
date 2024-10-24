"use client"
import { ApolloProvider } from "@apollo/client";
import client from "../../../lib/apolloClient";
import ProfilePage from "../components/profile/Profile";

export default function ProfileView(){
    return(
        <ApolloProvider client={client}>
        <ProfilePage/>
        </ApolloProvider>
    )
}