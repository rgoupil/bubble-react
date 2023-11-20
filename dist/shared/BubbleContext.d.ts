export interface BubbleContext {
    currentUser: {
        /** returns the value of a field for the object */
        get<T>(fieldName: string): T;
        /** returns an array of the different fields you can access. These fields will include email, logged_in, Slug, Created Date, Modified Date, and _id.  */
        listProperties(): string[];
    };
}
