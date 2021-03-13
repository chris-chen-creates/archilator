# 🅰🆁🅲🅷🅸🅻🅰🆃🅾🆁

A simple terminal-based calculator 🧮

## Dependencies
  - [node.js](nodejs.org) v14.11 or later
  - [npm](https://www.npmjs.com/)

## Setup  
1. Download the .zip file or clone the repo using the github command line tool:
      
        gh repo clone chris-chen-creates/archilator
2. Install the dependencies using:
   
        npm i

## How to run
1. Open a terminal window
2. Navigate to the Archilator project
3. Within terminal, use the command:
   
        npm start 
4. Enter an arithmetic equation into the prompt using any of the following characters: `0-9 + - * / . ( ) ^`
5. Press **ENTER**
6. The solution will be displayed on the next line

## Grammar

```
expression      -> addition ;
addition        -> multiplication ( "+" multiplication )* ;
multipliciation -> negative ( "*" negative )* ;
negative        -> "-"? primary ;
primary         -> NUMBER | group ;
group           -> "(" expression ")" ;
```
