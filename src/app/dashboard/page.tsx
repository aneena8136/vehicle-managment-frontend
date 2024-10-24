


import Faq from "@/modules/user/components/faq/Faq";
import Hero from "@/modules/user/components/hero/Hero";
import CarDashboardView from "@/modules/user/views/CarDashboardView";
import PlanTripView from "@/modules/user/views/PlanTripView";
import Link from "next/link";

export default function Home() {
  return (
    <div>
     
   
    
       <Hero/>
      <PlanTripView/>
     
      <Faq/> 
     
    
  
   
  </div>
  );
}
