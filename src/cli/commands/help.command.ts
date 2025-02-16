import { Command} from "./command.interface.js";
import chalk from "chalk";

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
      ${chalk.bold.green("Программа для подготовки данных для REST API сервера.")}

      ${chalk.bold("Пример:")}
          ${chalk.cyan("cli.js --<command> [--arguments]")}

      ${chalk.bold("Команды:")}
          ${chalk.yellow("--version")}:                   ${chalk.dim("# выводит номер версии")}
          ${chalk.yellow("--help")}:                      ${chalk.dim("# печатает этот текст")}
          ${chalk.yellow("--import <path>")}:             ${chalk.dim("# импортирует данные из TSV")}
          ${chalk.yellow("--generate <n> <path> <url>")}: ${chalk.dim("# генерирует произвольное количество тестовых данных")}
    `);
  }
}
