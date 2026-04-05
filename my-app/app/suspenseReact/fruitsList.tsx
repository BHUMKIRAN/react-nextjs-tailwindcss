import { lazy, Suspense } from "react";

const fruits = ["apple", "banana", "orange", "grape", "mango", "strawberry"];

   

const fruitslist = () => {
    return (
        <Suspense fallback={ <div>HEllo there i am inside suspense and  loading....</div>}>
            <div>
                {fruits.map((fruit) => <ul key={fruit}><li>{fruit}</li></ul>)}
            </div>
        </Suspense>

    )
}
export default fruitslist