#bin/bash
mysql --host=192.168.40.13 --user=root --password=xZxYmvEpm32CcYFj -e "
    ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'xZxYmvEpm32CcYFj'; flush privileges;"
exit