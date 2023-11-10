import asyncio
import websockets

async def receive_data():
    while True:
        async with websockets.connect("ws://localhost:8765") as websocket:
            # WebSocketサーバーからテキストデータを受け取る
            text_data = await websocket.recv()
            print(text_data)
            # テキストデータをファイルとして保存
            with open("savedata/savedata.json", "w") as file:
                file.write(text_data)
                print("ファイルが保存されました")

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(receive_data())
