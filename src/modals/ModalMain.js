import { ModalPage, ModalPageHeader, ModalRoot, RichCell } from "@vkontakte/vkui";
import React, { Component } from "react";
import "./ModalMain.css";
import ModalStock from "./ModalStocks/ModalStock";



class ModalMain extends Component {

    close = () => {
        const { setActiveModal } = this.props;   
        setActiveModal(null);
    }

    render() {
        const { activeModal, globState, setPopout } = this.props;
        return(
            <ModalRoot activeModal={activeModal}>
                <ModalPage id="stocks" onClose={this.close} dynamicContentHeight header={<ModalPageHeader>Акции</ModalPageHeader>}>
                    <ModalStock 
                        setPopout={setPopout}
                        socket={globState.socket}
                        stocks={globState.stocks}
                        user={globState.user}
                    />
                </ModalPage>
            </ModalRoot>
        )
    }
}

export default ModalMain;