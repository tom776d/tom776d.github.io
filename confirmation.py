import json
import tkinter as tk
from tkinter import ttk, filedialog
import os


class JSONEditorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("JSON Editor")

        # ツリービューの設定
        self.tree = ttk.Treeview(root)
        self.tree["columns"] = (
            "Title", "QR Code", "Registration Date", "Registrant", "Factory", "Department Code")
        self.tree.column("#0", width=0, stretch=tk.NO)
        for col in self.tree["columns"]:
            self.tree.column(col, anchor=tk.W, width=150)
            self.tree.heading(col, text=col, anchor=tk.W)

        self.tree.pack(expand=True, fill="both")

        # メニューバーの設定
        menu_bar = tk.Menu(root)
        root.config(menu=menu_bar)

        file_menu = tk.Menu(menu_bar, tearoff=0)
        menu_bar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Open", command=self.open_file)
        file_menu.add_command(label="Save", command=self.save_file)

        self.file_path = "//172.27.12.82/disk1/自動発注/orderData.json"
        self.reservations_path = "//172.27.12.82/disk1/自動発注/reservations.json"

        # "確認する"ボタン
        confirm_button = tk.Button(
            root, text="確認する", command=self.confirm_data)
        confirm_button.pack()
        
        # "削除"ボタン
        delete_button = tk.Button(root, text="削除", command=self.delete_selected)
        delete_button.pack()
        
        # "保存"ボタン
        save_button = tk.Button(root, text="保存", command=self.save_file)
        save_button.pack()

    def open_file(self):
        with open(self.file_path, "r", encoding="utf-8") as file:
            json_data = file.read()
            self.text_widget.delete("1.0", tk.END)
            self.text_widget.insert(tk.END, json_data)
        print("Opened file:", self.file_path)

    def save_file(self):
        json_data = self.text_widget.get("1.0", tk.END)
        with open(self.file_path, "w", encoding="utf-8") as file:
            file.write(json_data)
        print("Saved file:", self.file_path)

    def confirm_data(self):
        with open(self.file_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)

        # ツリービューをクリア
        for item in self.tree.get_children():
            self.tree.delete(item)

        # ツリービューにデータを挿入
        self.insert_data("", json_data)

    def insert_data(self, parent, data):
        with open(self.file_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)

        # ツリービューをクリア
        for item in self.tree.get_children():
            self.tree.delete(item)

        # ツリービューにデータを挿入
        for entry in json_data:
            self.tree.insert("", "end", values=(
                entry.get("タイトル", ""),
                entry.get("QR_code", ""),
                entry.get("登録日時", ""),
                entry.get("登録者", ""),
                entry.get("工場", ""),
                entry.get("部署コード", "")
            ))
            
    def save_file(self):
        # ツリービューのデータを取得
        tree_data = []
        for item_id in self.tree.get_children():
            item = self.tree.item(item_id)
            values = item["values"]
            entry = {
                "タイトル": values[0],
                "QR_code": values[1],
                "登録日時": values[2],
                "登録者": values[3],
                "工場": values[4],
                "部署コード": values[5]
            }
            tree_data.append(entry)

        # JSONファイルに書き込み
        with open(self.file_path, "w", encoding="utf-8") as file:
            json.dump(tree_data, file, ensure_ascii=False, indent=2)
            
    def delete_selected(self):
        selected_item = self.tree.selection()
        if selected_item:
            deleted_data = []
            for item_id in selected_item:
                item = self.tree.item(item_id)
                values = item["values"]
                entry = {
                    "タイトル": values[0],
                    "QR_code": values[1],
                    "登録日時": values[2],
                    "登録者": values[3],
                    "工場": values[4],
                    "部署コード": values[5]
                }
                deleted_data.append(entry)

            # 削除したデータを別のJSONファイルに追加保存
            with open(self.reservations_path, "a", encoding="utf-8") as reservations_file:
                # 既存のデータがなければ "[" を手動で追加
                if not os.path.exists(self.reservations_path):
                    reservations_file.write("[\n")

                # 既存のデータがなければ書き込まない
                if reservations_file:
                    for entry in deleted_data:
                        json.dump(entry, reservations_file, ensure_ascii=False, indent=2)
                        reservations_file.write(",\n")  # 削除したデータの間にカンマを追加

                # 既存のデータがなければ "]" を手動で追加
                if not os.path.exists(self.reservations_path):
                    reservations_file.write("]\n")

            # ツリービューから削除
            self.tree.delete(selected_item)


if __name__ == "__main__":
    root = tk.Tk()
    app = JSONEditorApp(root)
    root.mainloop()
