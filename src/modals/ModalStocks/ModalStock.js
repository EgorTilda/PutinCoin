import { Button, RichCell, List, Avatar } from "@vkontakte/vkui";
import React from "react";

import stock_1 from "../../img/stock_1.svg";
import stock_2 from "../../img/stock_2.svg";

const Stocks = [
    {
        stock_id: 1,
        title: "ООО Будущий хлеб",
        description: "Компания выращивающая хлеб, возможно что еще......",
        icon: stock_1
    },
    {
        stock_id: 2,
        title: "ОАО Банк",
        description: "Бан, бан и бан. Ой мы хотели сказать Банк.",
        icon: stock_2
    }
]

const ModalStock = ({ stocks, user }) => {


    function getStatus(i) {
        const stock = stocks[i];
        return `+ ${(stock.speed/1000).toFixed(3)}PC/сек, цена ${(stock.cost/1000).toFixed(3)}PC `
    }

    function buy(i) {

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
                              <Button>Продать</Button>
                              <Button disabled={stocks[i].cost > user.score} mode="commerce" onClick={() => buy(i)}>Купить</Button>
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