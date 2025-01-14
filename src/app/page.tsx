
import Faq from "@/modules/user/components/faq/Faq";
import Hero from "@/modules/user/components/hero/Hero";
import PlanTripView from "@/modules/user/views/PlanTripView";


import Link from "next/link";

export default function Home() {
  return (
    <div>
     
    <Link href="/login"></Link>
    <Link href="/register"></Link> 
       <Hero/>
      <PlanTripView/>
      <Faq/>  
    
      
  </div>
  );
}
