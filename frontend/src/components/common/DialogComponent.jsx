import {Dialog} from "@material-ui/core"
import React from "react"





export default function DialogComponent({
    openState,
    handleDialogClose,
    content,}){



    
    return(
        <Dialog open={openState} onClose={handleDialogClose}>
           {content}
        </Dialog>
    );
}
