# Task management in terminals
Task manager programmed in node js. This tool allows you to manage a project from your terminal without installing anything else.

## Install
```
npm install -g @arnaud.derison/task
```

## Usage

### Create a task
```
task add "Your task"
```
### List tasks

#### Remaining tasks

```
task list
```
return :

![project picture](https://gcdnb.pbrd.co/images/OcThJXjuZZ10.png?o=1)

#### All tasks

```
task list --all
```

![task list -all](https://gcdnb.pbrd.co/images/sVKJpgYrz0hH.png?o=1)

### Mark a task as done

```
task done 1
```

### Mark a task as undone

```
task undone 1
```

### Delete a task

```
task delete 3
```

### Swap tasks

```
task swap 1 2
```
### reset tasks
```
task reset
```
