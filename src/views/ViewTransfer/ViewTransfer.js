import { List, Panel, PanelHeader, Search, View } from "@vkontakte/vkui";
import React from "react";
import "./ViewTransfer.css";

const ViewTransfer = ({ id, activePanel, popout }) => {
    return(
        <View id={id} activePanel={activePanel} popout={popout}>
            <Panel id="main">
                <PanelHeader separator={false}>Переводы</PanelHeader>
                <Search />
                <List>
                    
                </List>
            </Panel>
        </View>
    )
}

export default ViewTransfer;