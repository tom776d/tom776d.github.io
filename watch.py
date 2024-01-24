import asyncio
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import websockets


async def connect_to_websocket_server(data):
    print(data)
    uri = "ws://localhost:8765"  # WebSocketサーバーのURI
    print(uri)
    async with websockets.connect(uri) as websocket:
        await websocket.send(data)
        print("CSVデータをWebSocketを介して送信終了")


class EventHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory:
            return  # Ignore events for directories

        print(f"Modified: {event.src_path}")
        if event.src_path.endswith('processing.csv'):
            try:
                print(f'CSVファイルが変更されました: {event.src_path}')
                with open(event.src_path, 'r') as csv_file:
                    csv_data = csv_file.read()
                print(csv_data)
                print("CSVデータをWebSocketを介して送信開始")

                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                loop.run_until_complete(connect_to_websocket_server(csv_data))
                loop.close()

                print("ファイルが送信されました")
            except Exception as e:
                print(f"エラーが発生しました: {e}")


def main():
    observer = Observer()
    observer.schedule(EventHandler(
    ), path="C:\\Users\\1362991\\Desktop\\DangerousWarehouse\\polling", recursive=True)
    observer.start()

    while True:
        time.sleep(1)


if __name__ == "__main__":
    main()
