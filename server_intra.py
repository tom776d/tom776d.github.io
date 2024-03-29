import asyncio
import websockets

# クライアントとのWebSocket接続を保持する変数
connected = set()

async def send_data_to_nas(websocket, path):
    # 新しい接続をconnectedに追加
    connected.add(websocket)
    try:
        async for data in websocket:
            # WebSocket接続ごとにデータを受信
            print(f"Received data: {data}")

            # ここでクライアントにデータを送信
            await send_data_to_clients(data)
            print("クライアントにデータ送信")
    finally:
        # 接続が閉じられたらconnectedから削除
        connected.remove(websocket)
        print("connectedから削除します")

async def send_data_to_clients(data):
    # すべての接続済みクライアントにデータを送信
    if connected:
        await asyncio.wait([websocket.send(data) for websocket in connected])

# クライアントからの接続を待ち受けるサーバーを開始
start_server = websockets.serve(send_data_to_nas, "localhost", 8888)
print("サーバーの接続を開始します")
asyncio.get_event_loop().run_until_complete(start_server)
print("ループ処理を開始します")
asyncio.get_event_loop().run_forever()
print("ループ処理を継続します")

