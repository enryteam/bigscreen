package com.lapland.tools;

import java.awt.Component;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.beans.PropertyChangeListener;
import java.beans.PropertyEditor;

/**
 *
 */
public class StringEscapeEditor implements PropertyEditor {

    public StringEscapeEditor(boolean b, boolean c) {
    }

    @Override
    public void setValue(Object value) {
    }

    @Override
    public Object getValue() {
        return null;
    }

    @Override
    public boolean isPaintable() {
        return false;
    }

    @Override
    public void paintValue(Graphics gfx, Rectangle box) {
    }

    @Override
    public String getJavaInitializationString() {
        return null;
    }

    @Override
    public String getAsText() {
        return null;
    }

    @Override
    public void setAsText(String text) throws IllegalArgumentException {
    }

    @Override
    public String[] getTags() {
        return null;
    }

    @Override
    public Component getCustomEditor() {
        return null;
    }

    @Override
    public boolean supportsCustomEditor() {
        return false;
    }

    @Override
    public void addPropertyChangeListener(PropertyChangeListener listener) {
    }

    @Override
    public void removePropertyChangeListener(PropertyChangeListener listener) {
    }

}
