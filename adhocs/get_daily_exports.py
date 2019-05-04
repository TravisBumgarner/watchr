import requests
import time
import gzip
import json
import sqlite3


def insert_into_db(content_type, adult, movie_id, original_title, popularity, video):
    conn = sqlite3.connect("../api/src/database/db.sqlite")
    print(conn)
    original_title = original_title.replace('"', "'")
    raw_sql = f"""INSERT INTO movies (adult, id, original_title, popularity, video) VALUES ({int(adult)}, {movie_id}, "{original_title}", {popularity}, {video});"""
    print(raw_sql)

    conn.execute(raw_sql)
    conn.commit()
    conn.close()


def gzip_to_arrays(foo):
    with gzip.GzipFile("foo.json.gz", "r") as f:
        json_bytes = f.read()
    json_str = json_bytes.decode("utf-8")
    json_arrays = json_str.split("\n")

    return [json.loads(json_array) for json_array in json_arrays if len(json_array)]


def main():
    year, month, day = time.strftime("%Y,%m,%d").split(",")
    for content_type in ["movie"]:
        url = f"http://files.tmdb.org/p/exports/{content_type}_ids_{month}_{day}_{year}.json.gz"
        print(url)
        response = requests.get(url)
        data = gzip_to_arrays(response.content)
        for row in data[0:100]:

            insert_into_db(
                content_type=content_type,
                adult=row["adult"],
                movie_id=row["id"],
                original_title=row["original_title"],
                popularity=row["popularity"],
                video=row["video"],
            )


if __name__ == "__main__":
    main()
