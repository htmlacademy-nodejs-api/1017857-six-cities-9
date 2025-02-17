import { Command } from './command.interface.js';
import {TSVFileReader} from '../shared/libs/file-reader/index.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(chalk.green.bold('✔ Successfully imported data:'));
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(chalk.red.bold(`✖ Can't import data from file: ${chalk.underline(filename)}`));
      console.error(chalk.red(`Details: ${error.message}`));
    }
  }
}
