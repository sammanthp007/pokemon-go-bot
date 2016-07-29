from BeautifulSoup import BeautifulSoup
import requests

url = requests.get('https://en.wikipedia.org/wiki/List_of_Pok%C3%A9mon')
content = url.text.encode('ascii', 'ignore')

soup = BeautifulSoup(content)

print soup.find('table')

