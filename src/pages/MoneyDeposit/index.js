import MoneyDeposit from "./MoneyDeposit"
import { MoneyDepositProvider } from "../../Context/MoneyDepositContext"
import { ArkaProvider } from "../../Context/ArkaContext"

export default () => {
    return (
        <ArkaProvider>
          <MoneyDepositProvider>
            <MoneyDeposit />
          </MoneyDepositProvider>
        </ArkaProvider>
    )
}
