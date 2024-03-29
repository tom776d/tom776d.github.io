import asyncio
import websockets
import pandas as pd
import csv
import json
import os
from openpyxl import Workbook
from openpyxl.worksheet.table import Table, TableStyleInfo


async def receive_data():
    while True:
        async with websockets.connect("ws://localhost:8888") as websocket:
            # WebSocketサーバーからテキストデータを受け取る
            text_data = await websocket.recv()
            print(f"受信したデータ:{text_data}")
            print(f"デバッグ: 受信したデータの前後 - '{text_data.strip()}'")

            # データが100字以上で、なおかつ'QR_code:'で始まりstockplace"を含まないとき ＝> 発注データ
            if len(text_data) >= 100 and "stockPlace" not in text_data and text_data.startswith('QR_code:'):

                # 'QR_code:'を削除し、余分な空白も除去
                modified_text_data = text_data[len('QR_code:'):].lstrip()
                print(modified_text_data)
                # 組コードを81列目から5文字を取得
                kumicode = modified_text_data[79:84]
                # 各種ファイルパス設定
                file_path_csv = "//172.27.12.82/disk1/自動発注/orderData.csv"
                # ヘッダー
                #header = ["タイトル", "QR_code", "登録日時", "登録者", "工場", "部署コード"]

                # orderData.csvファイルが存在するか確認
                if os.path.exists(file_path_csv):
                    # ファイルが存在する場合は読み込んで既存データを取得
                    with open(file_path_csv, 'r', newline='') as csvfile:
                    # with open(file_path_csv, 'r', newline='', encoding='utf-8') as csvfile:
                        existing_data = list(csv.reader(csvfile))
                else:
                    # ファイルが存在しない場合は新しいデータリストを作成
                    existing_data = []
                
                # ヘッダーが存在しない場合のみ追加
                #if not existing_data or existing_data[0] != header:
                #    existing_data.insert(0, header)

                # 新しいCSVデータを追加
                new_data = [
                    "2",
                    modified_text_data,
                    "",
                    "",
                    "KA",
                    kumicode
                ]
                existing_data.append(new_data)

                # CSVファイルを書き込みモードで開く
                with open(file_path_csv, 'w', newline='') as csvfile:
                # with open(file_path_csv, 'w', newline='',encoding='utf-8') as csvfile:
                    writer = csv.writer(csvfile)

                    # データをCSVファイルに書き込む
                    writer.writerows(existing_data)

                    print("CSVファイルを保存しました")

                # # JSON形式に加工
                # json_data = {
                #     "タイトル": "2",
                #     "QR_code": modified_text_data,
                #     "登録日時":"",
                #     "登録者":"",
                #     "工場": "KA",
                #     "部署コード":kumicode,
                # }

                # # orderData.csvファイルが存在するか確認
                # if os.path.exists(file_path_csv):
                #     # ファイルが存在する場合は読み込んで既存データを取得
                #     with open(file_path_csv, 'r', newline='', encoding='utf-8-sig') as csvfile:
                #         existing_data = list(csv.DictReader(csvfile))
                # else:
                #     # ファイルが存在しない場合は新しいデータリストを作成
                #     existing_data = []

                # # 新しいCSVデータを追加
                # existing_data.append(json_data)

                # # CSVファイルを書き込みモードで開く
                # with open(file_path_csv, 'w', newline='', encoding='utf-8') as csvfile:
                #     # CSVヘッダーが必要な場合はフィールド名を指定
                #     fieldnames = ["タイトル","QR_code", "登録日時", "登録者", "工場", "部署コード"]
                #     writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

                #     # ヘッダーを書き込む
                #     writer.writeheader()

                #     # データをCSVファイルに書き込む前にエンコード
                #     #encoded_data = {key: value.encode('utf-8').decode('utf-8') if isinstance(value, str) else value for key, value in json_data.items()}

                #     # データをCSVファイルに書き込む
                #     writer.writerow(existing_data)
                    # writer.writerow(encoded_data)

                # # 各種ファイルパス設定
                # file_path = "//172.27.12.82/disk1/自動発注/orderData.json"
                # file_path_excel = "//172.27.12.82/disk1/自動発注/orderData.xlsx"
                # file_path_excel_with_table = "//172.27.12.82/disk1/自動発注/orderData_with_table.xlsx"

                # # orderData.jsonファイルが存在するか確認
                # if os.path.exists(file_path):
                #     with open(file_path, "r") as file:
                #     #with open(file_path, "r", encoding='utf-8') as file:
                #         existing_data = json.load(file)
                # else:
                #     existing_data = []

                # # 新しいJSONデータを追加
                # existing_data.append(json_data)

                # # ファイル全体を上書き
                # with open(file_path, "w") as file:
                # #with open(file_path, "w", encoding='utf-8') as file:
                #     json.dump(existing_data, file, ensure_ascii=False,
                #               indent=2)  # indent=2 で2スペースのインデントを追加

                #     # DataFrameを作成
                #     df = pd.DataFrame(existing_data)

                #     # Excelファイルへの書き込み
                #     df.to_excel(file_path_excel, index=False)
                #     print("データがファイルに追加されました")

                # with pd.ExcelWriter(file_path_excel_with_table, engine='xlsxwriter') as writer:
                #     df.to_excel(writer, sheet_name='Sheet1',
                #                 index=False, startrow=1, header=False)
                #     worksheet = writer.sheets['Sheet1']

                #     # テーブルを追加
                #     table_range = f"A1:{chr(ord('A') + len(df.columns) - 1)}{len(df) + 1}"
                #     worksheet.add_table(
                #         table_range, {'columns': [{'header': col} for col in df.columns]})

                # print("データがファイルに追加され、Excelファイルに書き込まれました（テーブルあり）")

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(receive_data())
