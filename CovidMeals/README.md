# Home Cooked Meals

## Setup

### step - 1
- Make sure you have nodejs installed in your machine.

- Install "yarn" using npm install

    `npm install --global yarn`

### step - 2

- Clone the repository and navigate to CovidMeals directory
    
    `cd Roringoscrapes/CovidMeals`

### step - 3

- Install all the necessary dependencies using the following command

    `yarn`

## Run Scripts

### step - 1

- Extract the data from target website and save the data in data.json using the following command

    `yarn extract`

### step - 2

- Make the convertable and save the convertable data in convertable.json
  
  `yarn make_convertable`

## Exports

- convert the convertable data into CSV 
    `yarn convert2csv`