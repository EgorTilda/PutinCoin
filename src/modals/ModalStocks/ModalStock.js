import { Icon28LogoInstagram } from "@vkontakte/icons";
import { Button, RichCell, List, Avatar, ScreenSpinner } from "@vkontakte/vkui";
import React, { useEffect } from "react";

import stock_1 from "../../img/stock_1.svg";
import stock_2 from "../../img/stock_2.svg";

const Stocks = [
    {
        stock_id: 1,
        title: "ООО Будущий хлеб",
        icon: stock_1
    },
    {
        stock_id: 2,
        title: "ОАО Банк",
        icon: stock_2
    },
    {
        stock_id: 3,
        title: "Instagram",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/1200px-Instagram_logo_2016.svg.png"
    },
    {
        stock_id: 4,
        title: "Вкогтакье",
        icon: "https://pbs.twimg.com/profile_images/1314542259984048131/i9YK5BKr_400x400.jpg"
    }
]

const ModalStock = ({ stocks, user, socket, setPopout }) => {

    useEffect(() => {
        stocks.forEach((s, i) => {
            Stocks[i] = { ...Stocks[i], ...s}
        });
    })

    function getStatus(i) {
        const stock = Stocks[i];
        return `+ ${(stock.speed/1000).toFixed(3)}PC/сек`
    }

    function buy(i) {
         setPopout(<ScreenSpinner />)
         socket.emit("buy", { user_id: user.user_id, stock_id: Stocks[i].stock_id });
    }

    function sale(i) {
        setPopout(<ScreenSpinner />)
        socket.emit("sale", { user_id: user.user_id, stock_id: Stocks[i].stock_id });
    }

    return(
        <List>
            {
                Stocks.map((stock, i) => (
                    <RichCell
                        key={stock.stock_id}
                        multiline
                        disabled
                        after={user.buys.filter((i) => i.stock_id === stock.stock_id).length}
                        text={stock.description}
                        caption={getStatus(i)}
                        before={<Avatar size={72} src={stock.icon} />}
                        actions={
                            <React.Fragment>
                              <Button onClick={() => sale(i)}>Продать за {2*(stock.cost_sale*(user.buys.filter((e) => e.stock_id === stock.stock_id).length+1)/1000).toFixed(3)} PC</Button>
                              <Button disabled={stocks[i].cost*(user.buys.filter((i) => i.stock_id === stock.stock_id).length+1) > user.score} mode="commerce" onClick={() => buy(i)}>
                                  Купить за {(2*stock.cost_buy*(user.buys.filter((e) => e.stock_id === stock.stock_id).length+1)/1000).toFixed(3)} PC
                                </Button>
                            </React.Fragment>
                          }
                    >
                        {stock.title}
                    </RichCell>
                ))
            }
        </List>
    )
}

export default ModalStock;