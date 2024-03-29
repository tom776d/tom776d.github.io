# -*- coding: utf-8 -*-
import asyncio
import websockets
import json

async def receive_data():
    # 各種ファイルパス設定
    file_path_save = "savedata/savedata.json"
    file_path_order = "savedata/order.txt"
    #file_path_save = "/home/pi/Desktop/データ連携/savedata.json"
    #file_path_order = "/home/pi/Desktop/データ連携/orderdata.json"
    
    while True:
        async with websockets.connect("ws://localhost:8765") as websocket:
            # WebSocketサーバーからテキストデータを受け取る
            text_data = await websocket.recv()
            print(f"受信したデータ:{text_data}")
            print(f"デバッグ: 受信したデータの前後 - '{text_data.strip()}'")

            # "stockPlace"の文字列が含まれているか確認
            if "stockPlace" in text_data:
                # テキストデータをファイルとして保存
                with open(file_path_save, "w") as file:
                    file.write(text_data)
                    print("saveファイルが保存されました")
                    
            # データが100字以上で、なおかつ'QR_code:'で始まりstockplace"を含まないとき ＝> 発注データ
            elif len(text_data) >= 100 and "stockPlace" not in text_data and text_data.startswith('QR_code:'):
                #modified_text_data = text_data[len('QR_code:'):].lstrip()  # 'QR_code:'を削除し、余分な空白も除去
                with open(file_path_order, "w") as file:
                    file.write(text_data)
                    # file.write(json.dumps(text_data, ensure_ascii=False))
                    print("orderファイルが保存されました")
                                    
if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(receive_data())
