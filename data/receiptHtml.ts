import { FetchedOrderType } from "@/types/type";

export const receiptHtml = (order:FetchedOrderType)=>{
    return (
        `<html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                body {
                    font-family: 'Courier New', Courier, monospace;
                    background: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    padding: 20px;
                }
                .parent {
                    width: 100%;
                    position: relative;
                    height::"100%;
                }
                .container {
                    width: 100%;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                }
                .background-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0.15;
                    z-index: 0;
                    object-fit: cover;
                }
                .body-container {
                    padding: 20px;
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .title-text {
                    font-size: 35px;
                    font-weight: normal;
                    width: 100%;
                    text-align: left;
                    color: #000;
                }
                .info-container {
                    padding: 8px 0;
                    border-top: 2px dashed #ccc;
                    border-bottom: 2px dashed #ccc;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .info-view {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 2px;
                }
                .info-title {
                    font-size: 35px;
                    font-weight: bold;
                    color: #ccc;
                }
                .info-details {
                    font-size: 35px;
                    font-weight: normal;
                    text-transform: capitalize;
                    color: #000;
                }
                .status-completed {
                    color: #22c55e;
                }
                .status-pending {
                    color: #ef4444;
                }
                .item-scroll {
                    width: 100%;
                    max-height: 192px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .item-row {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 100%;
                }
                .total-row {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    width: 100%;
                }
                </style>
            </head>
            <body>
                <div class="parent">
                    <div class="container">
                        <div class="body-container">
                            <div class="title-text">Order ${order._id}</div>

                            <div class="info-container">
                                <div class="info-view">
                                    <div class="info-title">Name:</div>
                                    <div class="info-details">${order.name}</div>
                                </div>

                                <div class="info-view">
                                    <div class="info-title">Date:</div>
                                    <div class="info-details">${new Date(order.placedAt).toLocaleString(undefined,{year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"})}</div>
                                </div>

                                <div class="info-view">
                                    <div class="info-title">Payment status:</div>
                                    <div class="info-details ${order.status === "completed" ? "status-completed" : "status-pending"}">${order.status}</div>
                                </div>
                            </div>

                            <div class="item-scroll">
                                ${order.items.map(item => `
                                    <div class="item-row">
                                        <div class="info-details">${item.foodId.name}${item.quantity > 1 ? ` x${item.quantity}` : ""}</div>
                                        <div class="info-details">₦${item.priceAtPurchase}</div>
                                    </div>
                                `).join("")}
                                
                                <div class="item-row">
                                    <div class="info-details">Delivery fee</div>
                                    <div class="info-details">₦0</div>
                                </div>
                            </div>

                            <div class="total-row">
                                <div class="info-details">Total: ₦${order.total}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
`
);}