import MoneyDeposit from "./MoneyDeposit"
import { MoneyDepositProvider } from "../../Context/MoneyDepositContext"

export default () => {
    return (
        <MoneyDepositProvider>
            <MoneyDeposit />
        </MoneyDepositProvider>
    )
}
