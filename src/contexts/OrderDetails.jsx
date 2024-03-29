import { createContext, useContext, useState, useMemo, useEffect } from "react"
import { pricePerItem } from "../constants/index"

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

// @ts-ignore
const OrderDetails = createContext()

// create custom hook to check wheter we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider",
    )
  }

  return context
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }

  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  })

  const zeroCurrency = formatCurrency(0)

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  })

  const [orderPhase, setOrderPhase] = useState("inProgress")

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts)
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts)
    const grandTotal = scoopsSubtotal + toppingsSubtotal

    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts }

      // update option count for this item
      const optionCountsMap = optionCounts[optionType] // newOptionCounts ??
      optionCountsMap.set(itemName, parseInt(newItemCount))

      setOptionCounts(newOptionCounts)
    }

    // function setPhase(orderPhaseName) {
    //   setOrderPhase(orderPhaseName);
    // }

    // getter: object containing options counts for scoops and toppings, subtotals and totals
    // setter: updateOptionCount

    return [
      { ...optionCounts, totals, orderPhase },
      updateItemCount,
      setOrderPhase,
    ]
  }, [optionCounts, totals, orderPhase])

  return <OrderDetails.Provider value={value} {...props} />
}
