"use client"
import { useParams } from 'next/navigation';

import BookVehicleView from "@/modules/user/views/BookVehicleView";

export default function page(){
    const params = useParams();
    const id = params.id as string;
    return(
        <BookVehicleView id={id}/>
    );
};
