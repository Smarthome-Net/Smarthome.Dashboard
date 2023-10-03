export abstract class StatisticService {
    abstract initStatistic(): void;
    abstract refreshStatistic(): void;
    abstract resetStatistic(): void;
}