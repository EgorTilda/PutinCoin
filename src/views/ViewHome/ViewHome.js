import { Button, Card, CardGrid, Div, Gallery, IconButton, Link, Panel, PanelHeader, Separator, Title, View } from "@vkontakte/vkui";
import { Icon28ListCheckOutline, Icon28DocumentOutline, Icon48Play, Icon20LightbulbStarOutline, Icon28LightbulbStarOutline, Icon24HammerOutline, Icon48Pause, Icon28SwitchOutline } from '@vkontakte/icons';
import React from "react";
import "./ViewHome.scss";
import UserScore from "./../../Components/UserScore/UserScore";
import "./ViewHome.scss"

const ViewHome = ({ id, activePanel, popout,setGlobState, globState, setActiveModal, modal, snackbar }) => {
    const { user, miner, isMining } = globState;
    const score = user ? (user.score / 1000).toFixed(3) : 0;
    const addScore = user ? (user.add_score / 1000).toFixed(3) : 0;


    function startMining() {
        setGlobState({ isMining: true })
        miner.start()
    }

    function stopMining() {
        setGlobState({ isMining: false })
        miner.stop();
    }

    return (
        <View id={id} popout={popout} activePanel={activePanel} modal={modal}>
            <Panel className="main" id="main">
                {user &&
                    <UserScore scoreValue={score.toString().replace(".", ",")} addScore={addScore} />
                }

            <div className="card-nav">
                <CardGrid size="s">
                        <Card className="card card--left" onClick={() => setActiveModal("stocks")}>
                            <div className="card__content">
                                <Icon28ListCheckOutline fill="#fff" />
                                <div className="card__title">Задания</div>
                            </div>
    
                        </Card>

                        <Card className="card card--right">
                            <div className="card__content">
                                <Icon28DocumentOutline fill="#fff" />
                                <div className="card__title">Акции</div>
                            </div>
                        </Card>

                        <Card className="card card--right">
                            <div className="card__content">
                                <Icon28DocumentOutline fill="#fff" />
                                <div className="card__title">Акции</div>
                            </div>
                        </Card>
                    </CardGrid>
            </div>

              <Gallery
                slideWidth="100%"
                align="center"
                bullets="dark"
                className="gallery"
                style={{ height: 220 }}
              >
                <div className="container" align="center">
                    <Card className="menu_miner">
                        <div className="menu_miner_content">
                            <div className="hint_miner">
                                <IconButton>
                                    <Icon28LightbulbStarOutline fill="var(--accent)" />
                                </IconButton>
                            </div>
                            <div className="exchange_miner">
                                <IconButton>
                                    <Icon28SwitchOutline fill="var(--accent)" />
                                </IconButton>
                            </div>
                            <div className="title_slide">Майнер<Icon24HammerOutline /></div>
                            <span className="title_hashrate">{miner && miner.getHashesPerSecond()}hs/s(~{miner && miner.getHashesPerSecond()}pc/c)</span>
                            <Div>
                                {!isMining ? <IconButton onClick={startMining}>
                                    <Icon48Play fill="var(--accent)"/>
                                </IconButton> : 
                                <IconButton onClick={stopMining}>
                                    <Icon48Pause fill="var(--accent)"/>
                                </IconButton>
                                }
                            </Div>
                            <Link>Майнинг на другом устройстве?</Link>
                        </div>
                    </Card>                  
                </div>
                <div className="container" align="center">
                    <Card className="menu_miner">
                        <div className="menu_miner_content">
                            <div className="title_slide">Настройки</div>
                        </div>
                    </Card>                  
                </div>
              </Gallery>
                {snackbar}
            </Panel>
        </View>
    );
}

export default ViewHome;