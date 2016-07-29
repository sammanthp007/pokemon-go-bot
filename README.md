## Running the program
```node index```

## SSH setup

```ssh-keygen -t rsa```

```ssh-keygen -t dsa```

### Add the public keys to your authorized_keys file by entering the commands below:
Caution: Never add any private keys (~/.ssh/id_rsa or ~/.ssh/id_dsa) to the authorized_keys file.
```
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
$ cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys 
$ chmod 711 ~/.ssh
$ chmod 644 ~/.ssh/authorized_keys
```

Add the following line to your ~/.ssh/config file (using the vi editor or similar). This configures SSH to use an SSH v2 connection:
Protocol 2
