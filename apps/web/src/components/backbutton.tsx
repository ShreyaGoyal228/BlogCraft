import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
const BackButton = () => {
const router = useRouter()
    return(
        <>
       <button onClick={() => router.back()} className="btn"> <ChevronLeft /> Back</button>
        </>
    )
}
export default BackButton