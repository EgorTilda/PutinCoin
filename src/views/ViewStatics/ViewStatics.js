import { View } from "@vkontakte/vkui";
import React from "react";
import "./ViewStatics.css";

const ViewStaics = ({ id, activePanel, popout }) => {
    return(
        <View id={id} activePanel={activePanel} popout={popout}>

        </View>
    );
}

export default ViewStaics;