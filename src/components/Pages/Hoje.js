import { useContext } from "react";
import Context from "../../contexts/Context";

export default function Hoje() {
    const Fixos = useContext(Context)

    return (
        <>
            {Fixos}

        </>
    )
}