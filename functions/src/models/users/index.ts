import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsObject, IsString, Max, Min } from 'class-validator';
import { firestore } from 'firebase-admin';
// eslint-disable-next-line import/no-cycle
import { IQuestionnaire } from '../questionnaires';
import DocumentData = firestore.DocumentData;
import DocumentReference = firestore.DocumentReference;

export enum ApplicationPreference {
  pin = 'pin',
  cav = 'cav'
}

export interface IUser extends DocumentData {
  cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null;
  pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null;
  averageRating: number;
  casesCompleted: number;
  requestsMade: number;
  username: string;
  displayName: string | null;
  applicationPreference?: ApplicationPreference;
}

export class User implements IUser, FirestoreDataConverter<User> {

  @IsObject()
  private _cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null;

  @IsObject()
  private _pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null;

  @IsNumber()
  @Min(1)
  @Max(5)
  private _averageRating: number;

  @IsInt()
  @Min(0)
  private _casesCompleted: number;

  @IsInt()
  @Min(0)
  private _requestsMade: number;

  @IsString()
  @IsNotEmpty()
  private _username: string;

  @IsString()
  private _displayName: string | null;

  @IsEnum(ApplicationPreference)
  private _applicationPreference: ApplicationPreference;

  constructor(
    cavQuestionnaireRef: DocumentReference<IQuestionnaire> | null,
    pinQuestionnaireRef: DocumentReference<IQuestionnaire> | null,
    averageRating: number,
    casesCompleted = 0,
    requestsMade = 0,
    username: string,
    displayName: string | null = null,
    applicationPreference = ApplicationPreference.pin,
  ) {
    this._cavQuestionnaireRef = cavQuestionnaireRef;
    this._pinQuestionnaireRef = pinQuestionnaireRef;
    this._averageRating = averageRating;
    this._casesCompleted = casesCompleted;
    this._requestsMade = requestsMade;
    this._username = username;
    this._displayName = displayName;
    this._applicationPreference = applicationPreference;
  }

  static factory = (data: IUser): User => new User(
    data.cavQuestionnaireRef,
    data.pinQuestionnaireRef,
    data.averageRating,
    data.casesCompleted,
    data.requestsMade,
    data.username,
    data.displayName,
    data.applicationPreference,
  );

  get cavQuestionnaireRef(): DocumentReference<IQuestionnaire> | null {
    return this._cavQuestionnaireRef;
  }

  set cavQuestionnaireRef(value: DocumentReference<IQuestionnaire> | null) {
    this._cavQuestionnaireRef = value;
  }

  get pinQuestionnaireRef(): DocumentReference<IQuestionnaire> | null {
    return this._pinQuestionnaireRef;
  }

  set pinQuestionnaireRef(value: DocumentReference<IQuestionnaire> | null) {
    this._pinQuestionnaireRef = value;
  }

  get averageRating(): number {
    return this._averageRating;
  }

  set averageRating(value: number) {
    this._averageRating = value;
  }

  get casesCompleted(): number {
    return this._casesCompleted;
  }

  set casesCompleted(value: number) {
    this._casesCompleted = value;
  }

  get requestsMade(): number {
    return this._requestsMade;
  }

  set requestsMade(value: number) {
    this._requestsMade = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get displayName(): string | null {
    return this._displayName;
  }

  set displayName(value: string | null) {
    this._displayName = value;
  }

  get applicationPreference(): ApplicationPreference {
    return this._applicationPreference;
  }

  set applicationPreference(value: ApplicationPreference) {
    this._applicationPreference = value;
  }

  fromFirestore(data: IUser): User {
    return User.factory(data);
  }

  toFirestore(modelObject: User): IUser {
    return {
      cavQuestionnaireRef: modelObject.cavQuestionnaireRef,
      pinQuestionnaireRef: modelObject.pinQuestionnaireRef,
      averageRating: modelObject.averageRating,
      casesCompleted: modelObject.casesCompleted,
      requestsMade: modelObject.requestsMade,
      username: modelObject.username,
      displayName: modelObject.displayName,
      applicationPreference: modelObject.applicationPreference,
    };
  }
}
